<h1>Update User Information</h1>

<body>
<div class="updateUser">
        <form action="/user/update" method="POST">
        <label for="userEmail">Please enter your existing Email:</label>
        <input type="text" id="userEmail" name="userEmail" required>
        <br>
        <label for="userFirst">First Name:</label>
        <input type="text" id="userFirst" name="userFirst">
        <br>
        <label for="userLast">Last Name:</label>
        <input type="text" placeholder="Last name" id="userLast" name="userLast">
        <br>
        <label for="userPassword">Password:</label>
        <input type="text" placeholder="userPassword" id="userPassword" name="userPassword">
        <br>
        <label for="userStreet">Address:</label>
        <input type="text" placeholder="Address" id="userStreet" name="userStreet">
        <br>
        <label for="userCity">City:</label>
        <input type="text" placeholder="City" id="userCity" name="userCity">
        <br>
        <label for="userState">State:</label>
        <input type="text" placeholder="State" id="userState" name="userState">
        <br>
        <label for="userZip">Zip Code:</label>
        <input type="text" placeholder="Zip" id="userZip" name="userZip">
        <br>
        <button>Update Information</button>
    </form>
</body>