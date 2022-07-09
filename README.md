# Debug container

This is a simple node container to test for example the configuration of an API gateway or Kubernetes ingress.

The container will respond with helpful information about the incoming request.

### Environment variables

You can configure the following parameters:

**PORT**<br />
HTTP port the app listens on.<br />
*Default: 80*

**EXPOSE_ENV**<br />
Expose the environment of this app to the response. This can be helpful for example in a Kubernetes environment.<br />
Be careful to not expose any secrets accidentally.<br />
*Default: false*

### Example 

**Request**
```
POST / HTTP/1.1
Host: localhost:8000
User-Agent: agent/1.0
Cookie: foo=bar
Content-Type: application/json
Accept: */*
Content-Length: 24

{
    "variable": "value"
}
```

**Response**
```
{
    "success": true,
    "path": "/",
    "method": "POST",
    "headers": {
        "host": "localhost:8000",
        "user-agent": "agent/1.0",
        "cookie": "foo=bar",
        "content-type": "application/json",
        "accept": "*/*",
        "content-length": "24"
    },
    "body": {
        "variable": "value"
    },
    "cookies": {
        "foo": "bar"
    },
    "env": {
        "NODE_VERSION": "18.5.0",
        "HOSTNAME": "500565210d6e",
        "PORT": "80",
        "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        "EXPOSE_ENV": "true",
        "NODE_ENV": "production"
    }
}
```
