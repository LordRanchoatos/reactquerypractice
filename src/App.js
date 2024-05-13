import { useQuery } from '@tanstack/react-query';
function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>An error occured</div>;
  return (
    <div>
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
