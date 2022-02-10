import { Helmet } from "react-helmet";
import { useRef } from "react";
import styles from "../styles/pages/Contact.module.css";
import Recaptcha from "react-google-invisible-recaptcha";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({ position: { x: "left", y: "bottom" } });

const Contact = () => {
    const recaptchaRef = useRef(null);
    const submitRef = useRef(null);
    const formRef = useRef(null);
    const inputs = useRef({ name: "", email: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        submitRef.current.disabled = true;
        recaptchaRef.current.execute();
    };

    const captchaResolved = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputs.current.name,
                email: inputs.current.email,
                message: inputs.current.message,
                "g-recaptcha-response": recaptchaRef.current.getResponse(),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    notyf.error(data.message);
                    submitRef.current.disabled = false;
                    formRef.current.reset();
                } else {
                    notyf.success(data.message);
                    formRef.current.reset();
                    submitRef.current.classList.add(styles.success);
                }
            })
            .catch((e) => {
                console.log(e);
                notyf.error("Server error");
                submitRef.current.disabled = false;
                formRef.current.reset();
            });
    };

    return (
        <>
            <Helmet>
                <title>Contact / Ujjwal Dimri</title>
            </Helmet>
            <div className={styles.mainContainer}>
                <div className={styles.contactDiv}>
                    <span>Get in touch</span>
                    <form
                        method="POST"
                        autoComplete="off"
                        className={styles.form}
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.formInput}>
                            <span>Name / Business Name</span>
                            <input
                                name="name"
                                placeholder="dx3 studios"
                                onChange={(e) => (inputs.current.name = e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formInput}>
                            <span>Email</span>
                            <input
                                name="email"
                                type="email"
                                placeholder="me@ujjwaldimri.com"
                                onChange={(e) => (inputs.current.email = e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formInput}>
                            <span>Message</span>
                            <textarea
                                name="message"
                                placeholder="Type your message here"
                                onChange={(e) => (inputs.current.message = e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <input
                            type="submit"
                            value="Send"
                            ref={submitRef}
                            className={styles.formSubmit}
                        />
                        <Recaptcha
                            ref={recaptchaRef}
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                            onResolved={captchaResolved}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Contact;
