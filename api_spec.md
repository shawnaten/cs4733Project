# CS 4773 Project RESTful API Spec


## Notes
- Basing this off the Instagram API.  
https://instagram.com/developer/endpoints/
- The error codes will follow the HTTP codes.  
http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
- Why we require a username & password for each request.  
http://stackoverflow.com/questions/6068113/do-sessions-really-violate-restfulness


## Changes
- **10-29-15 1:43 pm:** First draft; account endpoints.


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
`/account/create/{bank-id}?name=NAME&email=EMAIL/`

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

Possible Error Causes:
- "username invalid"
- "temp-password invalid"
- "new-password invalid"

Notes:
This applies to both changing your temporary password or a previously set
password.

### Change Your Email
`/account/email/{old-email}?password=PASSWORD&new_email=NEW-EMAIL`

Possible Error Causes:
- "login invalid"
- "new-email invalid"

Notes:

### Initiate Account Deletion
`/account/delete/initiate/{email}?password=PASSWORD`

Possible Error Causes:
- "login invalid"

Notes:

### Confirm Account Deletion
`/account/delete/confirm/{email}?password=PASSWORD?token=TOKEN`

Possible Error Causes:
- "login invalid"
- "token invalid"

Notes:
