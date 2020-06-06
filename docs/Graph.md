# Request graph and traversal
The key attributes of a request are its method and the outcome it is supposed to bring. After a request is successful, the semantics help us decide the state of the application. That in turn helps us decide what to expect from subsequent requests. These three statements are the core of this section. Let us understand what they mean with an example.

Consider a `Get Negative` request to an application that maintains data of all students in a college. This request is meant to fetch(`Get`) a non existing student(`Negative`). Say that the request is successful. That means that the API confirmed that the student we wanted to fetch does not exist. This in turn helps us know the state of the API. We know that the student we wanted to fetch does not exist. This means that we can create it. So a `Post Positive` request should succeed now.

As you can see, if `Get Negative` succeeds, by semantics of REST, we can expect `Post Positive` to succeed. For every resource, we essentially maintain a graph of all the possible requests based on your API description. We then traverse that graph to provide complex flows. The further sections describe the nodes and edges of the graph.

## Nodes

A particular request to a REST API is essentially a combination of method, url, body (if any) and headers. Currently, we support generating requests on the basis of these attributes. Future versions of the tool might have advanced features such as supporting cookies. Based on your description, we collect each possible request scenario. This is simply a combination of request attributes discussed before. Each request is treated as a node of our Graph.
