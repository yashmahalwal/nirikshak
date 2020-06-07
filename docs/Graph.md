# Request graph and traversal

The key attributes of a request are its method and the outcome it is supposed to bring. After a request is successful, the semantics help us decide the state of the application. That in turn helps us decide what to expect from subsequent requests. These three statements are the core of this section. Let us understand what they mean with an example.

Consider a `Get Negative` request to an application that maintains data of all students in a college. This request is meant to fetch(`Get`) a non existing student(`Negative`). If request succeeds, it means that the API provided the expected outcome. In our case, this means that the API sent us an error saying that the resource we want to fetch does not exist. But if the request fails, it means that the API's response was not what we expected it to be. This is a bug and we report this request accordingly.

Say the request succeeds. So we know that the student we wanted to fetch does not exist. This means that we can create it. So a `Post Positive` request made using the resource used for last request should succeed now. On the other hand a `Delete Positive` request should fail. By knowing that the current request suceeded, we can know what request to make next - all thanks to semantics of the request.

For every resource, we essentially maintain a graph of all the possible requests based on your API description. We then traverse that graph to provide complex flows. The further sections describe the nodes and edges of the graph.

## Nodes

A particular request to a REST API is essentially a combination of method, url, body (if any) and headers. Currently, we support generating requests on the basis of these attributes. Future versions of the tool might have advanced features such as supporting cookies. Based on your description, we collect each possible request scenario. This is simply a combination of request attributes discussed before. Each request is treated as a node of our Graph.
