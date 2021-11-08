import { useState } from "react";
import Error from "../main/Error";
import Loading from "../main/Loading";
import Success from "../main/Success";
import Form from "../main/Form";

export default function List() {
    // ~~~ Keeping tabs on loading, error and success ~~~
    const [state, setState] = useState({
        loading: false,
        error: "",
        success: false
    });

    if(state.error) return (
        <section>
            <Error message={state.error} />
        </section>
    );

    if(state.loading) return (
        <section>
            <Loading />
        </section>
    );

    if(state.success) return (
        <section>
            <Success message="Thank you for your submission! We will contact you shortly. " />
        </section>
    );

    return (
        <section>
            <Form setState={setState}/>
        </section>
    );
}
