import { Form } from "react-router-dom";

export async function action(obj) {
    console.log(obj)
}

function LoginForm() {
    return (
        <>
            <Form method="post">
                <input type="text" placeholder="name" />
                <input type="text" placeholder="email" />
                <input type="text" placeholder="password" />
                <input type="submit" />
            </Form>
        </>
    )
}

export default LoginForm;