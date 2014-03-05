get '/' do
  # Look in app/views/index.erb
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

put '/todos/:id' do
  @todo = Todo.find(params[:id])
  @todo.complete = params[:complete]
  @todo.todo_content = params[:todo_content]
  @todo.updated_at = DateTime.now
  if @todo.save
      {:todo => @todo, :status => "success"}.to_json
  else
      {:todo => @todo, :status => "failure"}.to_json
  end
end

delete '/todos/:id' do
  Todo.destroy(params[:id])
  # if @todo.destroy
  #     {:todo => @todo, :status => "success"}.to_json
  # else
  #     {:todo => @todo, :status => "failure"}.to_json
  # end
  p 'asdasddasd12321312321231231231221213'
end
