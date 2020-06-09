# Outcome of an API request

Response to a request depends on how the request was made to the API. In this section, we discuss various request scenarios. We then move on to link them with REST semantics to understand what they signify.

## Possible cases

We classify requests into three categories, depending on different types of outcomes:

1. Positive: A valid request was made to the API which requested a valid operation. API was used as intended.
2. Negative: A valid request was made to the API which requested an illegal operation. The request was in violation of the API state.
3. Destructive: An invalid request was made to the API. This usually means that the request was made in a wrong way, such as sending improper body.

These definitions might seem a bit vague. That is because we do not have a context. Don't worry if it seems hard to grasp. We now move on to describe what cases are possible with which REST method and what do they imply. That should help you gain clarity and a better understanding.

## Get

`GET` method is used to retireve a given resource from the server. `GET` requests do not have a body.

1. **Positive**: Trying to get a resource instance that exists in the application.
2. **Negative**: Trying to get a resource instance that does not exist in the application.

## Put

`PUT` method is used to put a given resource in the application. If it already exists in the application, the old instance is replaced with the current one. Otherwise, a new resource instance is created in the application. The said instance is sent via `PUT` request body.

1. **Positive**: Trying to put a valid resource instance in the application.
2. **Destructive**: Trying to put an invalid resource instance in the application.

## Post

`POST` method is used to create new resource instance in the application. The said instance is sent via `POST` request body.

1. **Positive**: Trying to create a valid resource instance in the application which does not already exist.
2. **Negative**: Trying to create a valid resource instance in the application which already exists.
3. **Destructive**: Trying to create an invalid resource instance in the application.

## Delete

`DELETE` method is used to delete a given resource from the application. `DELETE` requests do not have a body.

1. **Positive**: Trying to delete a resource instance that exists in the application.
2. **Negative**: Trying to delete a resource instance that does not exist in the application.

## Patch

`PATCH` method is used to partially update a given resource in the application. The updation payload is send via request body.

1. **Positive**: Trying to correctly update a resource instance that exists in the application.
2. **Negative**: Trying to correctly update a resource instance that does not exist in the application.
3. **Destructive**: Trying to incorrectly update a resource instance. That usually means that either non existent fields are asked to be updated (invalid fields) or the fields are asked to be updated with invalid data (invalid values).

## Making a request corresponding to a case

A request is treated as an input to the API. The input along with the API state decides the outcome. The input format is fixed which is deduced using REST semantics and the description you provide us. API state refers to the resources that are in the application. So it all boils down to selecting the correct resource to make the request.

1. For positive requests, we generate request data using an existing resource.
2. For negative requests, we generate request data using a non existing resource. 
3. For destructive requests, we ask you to provide us with an invalid format of request data. We then populate that format using an existing resource.

We maintain a collection of resources that are supposed to exist and use that to test to your APIs.

_Note: If a method does not have a case associated with it, that implies that the case is not possible. For example, it is not possible to make a destructive `GET` request._