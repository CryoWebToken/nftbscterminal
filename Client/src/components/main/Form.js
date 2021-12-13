import "./Form.css";
import { useForm } from "react-hook-form";
import { submitProject } from "../../api";
import Mail from "../icons/Mail";
import User from "../icons/User";
import Pen from "../icons/Pen";
import Box from "../icons/Box";
import Image from "../icons/Image";
import Link from "../icons/Link";
import Twitter from "../icons/Twitter";
import Discord from "../icons/Discord";

export default function Form({ setState }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setState({
            loading: true,
            error: "",
            success: false
        });
        try {
            await submitProject(data);

            setState({
                loading: false,
                error: "",
                success: true
            });
        } catch (err) {
            setState({
                loading: false,
                error: "Something went wrong. Please try again later!",
                success: true
            });
        }        
    }
 
    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2>List your project</h2>
            <div className="form__field">
                <label>Email*</label>
                <div className={`form__field__input ${errors.email ? "form-error" : ""}`}>
                    <Mail />
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        placeholder="example@gmail.com"
                        {...register("email", { required: true, maxLength: 100 })}
                    />
                </div>
                {errors.email && errors.email.type === "required" && <p className="form-error">Email is required.</p>}
                {errors.email && errors.email.type === "maxLength" && <p className="form-error">Max length exceeded.</p>}
            </div>
            <div className="form__field">
                <label>Project name*</label>
                <div className={`form__field__input ${errors.projectName ? "form-error" : ""}`}>
                    <User />
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        placeholder="Catchy Name"
                        {...register("projectName", { required: true, maxLength: 100 })}
                    />
                </div>
                {errors.projectName && errors.projectName.type === "required" && <p className="form-error">Project name is required.</p>}
                {errors.projectName && errors.projectName.type === "maxLength" && <p className="form-error">Max length exceeded.</p>}
            </div>
            <div className="form__field">
                <label>Short description*</label>
                    <div className={`form__field__input ${errors.shortDesc ? "form-error" : ""}`}>
                    <Pen />
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        placeholder="Short and sweet."
                        {...register("shortDesc", { required: true, maxLength: 500 })}
                    />
                </div>
                {errors.shortDesc && errors.shortDesc.type === "required" && <p className="form-error">Short description is required.</p>}
                {errors.shortDesc && errors.shortDesc.type === "maxLength" && <p className="form-error">Max length exceeded.</p>}
            </div>
            <div className="form__field">
                <label>Contract address*</label>
                <div className={`form__field__input ${errors.projectAddress ? "form-error" : ""}`}>
                    <Box />
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        placeholder="0x0000000000000000000000000000000000000000"
                        {...register("projectAddress", { required: true, maxLength: 64 })}
                    />
                </div>
                {errors.projectAddress && errors.projectAddress.type === "required" && <p className="form-error">Contract address is required.</p>}
                {errors.projectAddress && errors.projectAddress.type === "maxLength" && <p className="form-error">Max length exceeded.</p>}
            </div>
            <div className="form__field">
                <label>Profile image URL*</label>
                <div className={`form__field__input ${errors.icon ? "form-error" : ""}`}>
                    <Image />
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        placeholder="https://static-image/avatar.png"
                        {...register("icon", { required: true })}
                    />
                </div>
                {errors.icon && <p className="form-error">Profile image URL is required.</p>}
            </div>
            <div className="form__field">
                <label>Banner image URL*</label>
                <div className={`form__field__input ${errors.banner ? "form-error" : ""}`}>
                    <Image />
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        placeholder="https://static-image/banner.png"
                        {...register("banner", { required: true })}
                    />
                </div>
                {errors.banner && <p className="form-error">Banner image URL is required.</p>}
            </div>
            <div className="form__field">
                <label>Website URL</label>
                <div className={`form__field__input ${errors.projectUrl ? "form-error" : ""}`}>
                    <Link />
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        placeholder="https://website.com/"
                        {...register("projectUrl", { required: false })}
                    />
                </div>
                {errors.projectAddress && <p className="form-error"></p>}
            </div>
            <div className="form__field">
                <label>Twitter Handle</label>
                    <div className={`form__field__input ${errors.projectTwitter ? "form-error" : ""}`}>
                    <Twitter />
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        placeholder="IAmHandle"
                        {...register("projectTwitter", { required: false })}
                    />
                </div>
                {errors.projectTwitter && <p className="form-error"></p>}
            </div>
            <div className="form__field">
                <label>Discord server</label>
                    <div className={`form__field__input ${errors.projectDiscord ? "form-error" : ""}`}>
                    <Discord />
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        placeholder="https://discord.gg/aBcDeFgHi"
                        {...register("projectDiscord", { required: false })}
                    />
                </div>
                {errors.projectDiscord && <p className="form-error"></p>}
            </div>
            <input className="input" type="submit" />
      </form>
    );
}
