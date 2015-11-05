# CS 4773 Project RESTful API Spec


## Notes
- Basing this off the Instagram API.  
https://instagram.com/developer/endpoints/
- The error codes will follow the HTTP codes.  
http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
- Why we require a username & password for each request.  
http://stackoverflow.com/questions/6068113/do-sessions-really-violate-restfulness


## Changes
- **11-5-15** Adding SSN to account creation endpoint.
- **11-3-15** Providing examples. Modified _Change Password_ error causes.
- **10-29-15** First draft; account endpoints.


## JSON Response Model
```js
{
    "meta": {
        "code": 200 // adhering to http response codes
        "cause": "" // short system-readable error message
        "description": "" // detailed human-readable error message
    },
    "data": {
        ... // specific to endpoints
    }
}
```

**Only "meta" and "code" are guaranteed non-null.**


## Account Endpoints
### Create
`/account/create/{bank-id}?ssn=SSN&name=NAME&email=EMAIL/`  
`/account/create/609afe81339a6a838178f4d35caf5ace?ssn=000000000&name=Rowdy+Roadrunner&email=rowdy.roadrunner@utsa.edu`

Possible Error Messages:
- "bank-id invalid"
- "bank-id taken"
- "name invalid"
- "email invalid"

Notes:
If the temp password is not changed within **10 minutes** the username is freed
and you must start over.

### Change Password
`/account/password/{email}?old_password=OLD-PASSWORD&new_password=NEW-PASSWORD/`  
`/account/password/rowdy.roadrunner@utsa.edu?old_password=d1365f&new_password=19CaWmItN69/`

Possible Error Causes:
- "email invalid"
- "temp-password invalid"
- "new-password invalid"

Notes:
This applies to both changing your temporary password or a previously set
password.

### Change Your Email
`/account/email/{old-email}?password=PASSWORD&new_email=NEW-EMAIL`
`/account/password/rowdy.roadrunner@utsa.edu?password=19CaWmItN69&new_email=prof.rowdy.roadrunner@utsa.edu/`

Possible Error Causes:
- "login invalid"
- "new-email invalid"

Notes:

### Initiate Account Deletion
`/account/delete/initiate/{email}?password=PASSWORD`
`/account/delete/initiate/rowdy.roadrunner@utsa.edu?password=19CaWmItN69`

Possible Error Causes:
- "login invalid"

Notes:

### Confirm Account Deletion
`/account/delete/confirm/{email}?password=PASSWORD?token=TOKEN`
`/account/delete/confirm/rowdy.roadrunner@utsa.edu?password=19CaWmItN69?token=cdc91f`

Possible Error Causes:
- "login invalid"
- "token invalid"

Notes:
