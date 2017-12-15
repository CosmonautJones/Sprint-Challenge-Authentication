<!-- Answers to the Short Answer Essay Questions go here -->
1. Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

    **Middleware** - is a function that is executed before the route handlers are executed, and after the server requests. It is the glue/bridge that ties in the application to the database.

    **Sessions** - Allows data to be persistent acorss multiple server requests. The session itself is specific and unique to each client. Sessions can store and access user data as the client browses the application. The server issues a cookie that gets sent to the web browser and stored for a period of time until it expires.
    When a user makes a following request to the web server, this cookie gets sent along with the
    request, and the server can read the information that is in it.
    The server can manipulate the cookie if it needs to, and then sends it back to the browser.
    Until the cookie expires, every time you make a request, your browser will send the cookies back to the server.

    **bcrypt** - a password hashing function that takes in a string of plaintext data that is the password and encryptes in a type of cryptographic hash algorithm. Making not relatable to the human language that could otherwise be obtained by hackers to cause harm or damage to a user's account by stealing valuable information.

    **JWT** -  a compact and self-contained way to securely transmit information between parties as a JSON Object. This information can be verified and trusted because it is digitally signed.
    It conatins 3 parts: Header, Payload, Signiture. 

2. What does bcrypt do in order to prevent attacks?

    With the incorporation of a salt to protect against rainbow table attacks. But one of it's key features is that bcrypt has an adaptive function, that over time, the iteration count can be increased to make it slower to complete the hash, so it remains resistant to brute-force search attacks even with increasing computation power.

3. What are the three parts of the JSON Web Token?

    HEADER - declares the type and contains a hashing algorithm
    
    PAYLOAD - carries the bulk of the JWT, also called the JWT Claims. Holds the information that be transmitted with other information about the token.
    
    SIGNITURE - The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.
