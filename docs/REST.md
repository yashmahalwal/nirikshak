# Rest semantics

This section covers how we interpret and use REST semantics. Our understanding is based on the [Roy Fielding's paper](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) as well as REST best practices in general. You should go through this section before you start writing your API descriptions.

## Uniform interface

All REST APIs expose a uniform interface. As per Roy Fielding's dissertation, REST is bound by 4 key constraints that allow it to provide a uniform interface. They are listed below:

1. Identification of resources
2. Manipulation of resources through representations
3. Self-descriptive messages
4. Hypermedia as the engine of application state.

We add two of our own constraints to the list. These constraints arise as a result of limited scope of the tool. We might overcome them in future.

1. We restrict ourselves to JSON as engine of application state.
2. The main purpose of the API is to create, retrieve, update and delete resources.

## Resource

Resources are the entities that are exposed by your application. Say you have an API that provides access to student database of a college. Then students of the college are your resource. Each individual student is a resource.

## Resource representation

Resource representation is essentially how the resource is exposed via the API. We assume that your API works with JSON as the hypermedia format to provide resource representation. For example, imagine a student whose major is computer science and age is 22. This is our resource. You can expose this resource via following representation

```json
{
    "age": 22,
    "major": "Computer Science"
}
```
Resource representation is upto you. We only require the representation to be in JSON. **_In essence, we expect resource representation to be key-value pairs._**

## Resource identification

Each resource in your API must be identifiable. We have established that the resource is represented as key-value pairs. **_To identify a resource, we expect the resource representation to contain a top level "id" key_**. The id attribute must have a unique identifier as its value in the resource pool. So, resource of same type must have different keys. Resources of different types (For example, faculty and student) may have same ids. While this is not ideal, it is not forbidden.

## Resource manipulation

Each request has resource(s) that it aims to manipulate. The HTTP method associated with the request establishes semantics for what action is to be taken. We currently allow working with the following verbs:

1. GET: Retrieve resource
2. POST: Create resource
3. DELETE: Delete resource
4. PUT: upsert resource
5. PATCH: update resource

If your API uses other verbs not covered here, you can write your own tests to validate them.

This sets up the context of our tool. Now that you know how we understand REST, you can start working with Nirikshak.