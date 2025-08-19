document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address1: document.getElementById("address1").value,
        address2: document.getElementById("address2").value,
        state: document.getElementById("state").value,
        city: document.getElementById("city").value,
        pincode: document.getElementById("pincode").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value
    };

    // Check if all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address1 || !formData.address2 || !formData.state || !formData.city || !formData.pincode || !formData.password || !formData.confirmPassword) {
            alert("Please fill all fields!");
            return;
    }
    // Check if email is valid
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(formData.email)) {
            alert("Invalid email!");
            return;
            }
    // Check if phone number is valid
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(formData.phone)) {
                alert("Invalid phone number!");
                return;
                }
    // Check if pincode is valid
            const pincodeRegex = /^\d{6}$/;
                if (!pincodeRegex.test(formData.pincode)) {
                    alert("Invalid pincode!");
                    return;
                    }
    // Check if password is valid
            //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)$/;
                //if (!passwordRegex.test(formData.password)) {
                  //  alert("Password must be at least 8 characters long, contain at least one lowercase letter,one uppercase letter, and one digit!");
                    //return;
                    //}
    
    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    // If all checks pass, submit the form
    document.getElementById("form").submit();

    // Send data to the backend
    try {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.success) {
            alert("Sign-up successful!");
        } else {
            alert("Sign-up failed. Try again!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error submitting form!");
    }
});
