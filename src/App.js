import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json()
      ),
      // staleTime: 4000,
      // refetchInterval: 3000,
  });

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
