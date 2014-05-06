get '/' do
  erb :index
end

get '/todos' do
  @todos = Todo.all
  @todos.to_json
end

post '/todos' do
  p params
  @todo = Todo.create(params)
  @todo.to_json
end

patch '/todos/:id' do
  @todo = Todo.find(params[:id])
  @todo.completed = true
end

delete '/todos/:id' do
  Todo.destroy(params[:id])
end
