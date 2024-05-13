import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json()
      ),
      // gcTime: 6000,
      // staleTime: 4000,
      // refetchInterval: 3000,

      //  dependent queries (assuming we have another query that  this query depends on a
      // data from it, when we set  enabled, the query only runs when the value is true.
      // enabled: !!id
    
  });

  // parallel queries are different queries can run at thesame time in parallel.
  //you only need to name it function differently. 

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }).then((res) => res.json()),
      // making a refetch to confirm data
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['posts'] });
    // },

    // editing the cache data directly.
    onSuccess: (newPost) => {
      queryClient.setQueriesData(['posts'], (oldPosts) => [...oldPosts, newPost])
    }
  });

  if (isLoading) return <div>Loading</div>;
  if (error || isError) return <div>An error occured</div>;
  return (
    <div>
      {isPending && <p>yor post is updating!!</p>}
      <button
        onClick={() =>
          mutate({
            userId: 1000,
            id: 1989,
            title: 'new post leggo go!',
            body: 'this is a new post, let, trying it out!',
          })
        }
      >
        New post
      </button>
      {data.map((todo, idx) => (
        <div key={idx}>
          <h4>{todo.id}</h4>
          <h1>{todo.title}</h1>
          <p>{todo.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
