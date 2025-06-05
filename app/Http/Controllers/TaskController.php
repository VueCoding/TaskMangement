<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{   
    public function createTask(Request $request){
        $validator = Validator::make($request->all(), [
            'title'=>'required',
        ]);
        $task = new Task();
        $task->title=$request->title;
        $task->description=$request->description;
        $task->due_date=$request->due_date;
        $task->status=$request->status=="Selected" ? "0" : $request->status ;
        $task->user_id = Auth::id();
        $task->save();
        return response()->json([
            'status'=>true,
            'message'=>'Task created successfully',
            'data' => $task
        ],200);
    }

   public function index(Request $request)
    {
        $query = Task::orderBy('id', 'desc');
        if ($request->has('status') && $request->status !== 'All') {
            $query->where('status', $request->status);
        }
        $tasks = $query->paginate(4);
        return response()->json($tasks);
    }


    public function destroy($id){

       $task = Task::findOrFail($id);
       if ($task->user_id !== Auth::id()) {
           return response()->json(['error' => 'Unauthorized'], 403);
       }
       $task->delete();
       return response()->json(['message' => 'task deleted'],200);
    }


    public function updateTask(Request $request,$id){
        $task = Task::findOrFail($id);
        if ($task->user_id !== Auth::id()) {
           return response()->json(['error' => 'Unauthorized'], 403);
        }
        $task->title=$request->title;
        $task->description=$request->description;
        $task->due_date=$request->due_date;
        $task->status=$request->status;
        $task->save();
        return response()->json([
            'status'=>true,
            'message'=>'Task update successfully',
            'data' => $task
        ],200);;
    }

    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $task
        ]);
    }

}
