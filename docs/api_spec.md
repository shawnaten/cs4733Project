# CS 4773 Project RESTful API Spec


## Notes
- Basing this off the Instagram API.  
https://instagram.com/developer/endpoints/
- The error codes will follow the HTTP codes.  
http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
- Why we require a username & password for each request.  
http://stackoverflow.com/questions/6068113/do-sessions-really-violate-restfulness
-Link to Android app 
https://github.com/mirzasohailbaig/Android-Rest-FrontEnd-CS4773/tree/master/app/src/main

## Changes
- **11-17-15** Changed error messages for /account/create and
/account/passoword. Added ip information for deployments.
- **11-5-15** Adding SSN to account creation endpoint.
- **11-3-15** Providing examples. Modified _Change Password_ error causes.
- **10-29-15** First draft; account endpoints.
- **12-1-15** Update with realistic examples.


## Running Deployment Info
**PHP Team**  
http://159.203.136.85/BankingSystem  
**Node Team**  
http://159.203.140.203/  
- only /account/create endpoint is implemented


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
`/account/create/0?ssn=170483472&name=Liam+Guadalupe&email=you@gmail.com`

Possible Error Messages:
- "user not found"
- "account exists"

Notes:
If the temp password is not changed within **10 minutes** the username is freed
and you must start over.

### Change Password
`/account/password/{email}?old_password=OLD-PASSWORD&new_password=NEW-PASSWORD/`  
`/account/password/you@gmail.com?old_password=8zpjiy99nfp4jb7t&new_password=i<3kittens/`

Possible Error Causes:
- "login invalid"

Notes:
This applies to both changing your temporary password or a previously set
password.

### Change Your Email
`/account/email/{old-email}?password=PASSWORD&new_email=NEW-EMAIL`
`/account/password/you@gmail.com?password=i<3kittens&new_email=new.you@gmail.com/`

Possible Error Causes:
- "login invalid"
- "new-email invalid"

Notes:

### Initiate Account Deletion
`/account/delete/initiate/{email}?password=PASSWORD`
`/account/delete/initiate/you@gmail.com?password=i<3kittens`

Possible Error Causes:
- "login invalid"

Notes:

### Confirm Account Deletion
`/account/delete/confirm/{email}?password=PASSWORD?token=TOKEN`
`/account/delete/confirm/you@gmail.com?password=i<3kittens?token=4xb7dsgksc99cjex`

Possible Error Causes:
- "login invalid"
- "token invalid"

Notes:

## Message Endpoints
### Send
`/message/send/{email}?password=PASSWORD&to=TO&title=TITLE&content=CONTENT/`  
`/message/send/you@gmail.com?password=i<3kittens&to=Liam+Guadalupe&title=Message-Title&content=blah..blah..blah../.`

Possible Error Messages:
- "login invalid"

Notes:
The `to=` part must have full name of the reciepent as shown in example.

### Check Inbox
`/message/inbox/{email}?password=PASSWORD/`  
`/message/inbox/you@gmail.com?password=8zpjiy99nfp4jb7t/`

Possible Error Causes:
- "login invalid"

Notes:

### Check Outbox
`/message/outbox/{email}?password=PASSWORD/`  
`/message/outbox/you@gmail.com?password=8zpjiy99nfp4jb7t/`

Possible Error Causes:
- "login invalid"

Notes:

### Check Trashbox
`/message/trashbox/{email}?password=PASSWORD/`  
`/message/trashbox/you@gmail.com?password=8zpjiy99nfp4jb7t/`

Possible Error Causes:
- "login invalid"

Notes:

### Mark Message as Trash
`/message/markasTrash/{email}?password=PASSWORD&_id=id/`  
`/message/markasTrash/you@gmail.com?password=8zpjiy99nfp4jb7t&_id=v2ev2ebm2eb2enbwjbnin2g2g2bm/`

Possible Error Causes:
- "login invalid"

Notes:
you must send the unique `_id` of the message marked for trash.

