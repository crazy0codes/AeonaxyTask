import { Form } from "react-router-dom";

export async function action({ request }) {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const response = await fetch(`https://aeonaxytask.onrender.com/api/user/login?username=${username}&password=${password}`, {
            method : "POST",
            body  : JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            return { message: "invalid details" }
        }
        else {
            console.log(response.json());
            return null;
        }

    } catch (error) {
        console.log("An error occurred:", error.message);
        return error;
    }
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