import { useMutation, useQuery } from '@tanstack/react-query';
function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }).then((res) => res.json()),
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
        </div>
      ))}
    </div>
  );
}

export default App;
