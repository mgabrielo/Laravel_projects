<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function get_all_projects()
    {
        $projects = Project::orderBy('id', 'DESC')->get();
        return response()->json([
            'projects' => $projects
        ], 200);
    }

    public function add_project(Request $request)
    {
        $project = new Project();

        $project->title = $request->title;
        $project->description = $request->description;
        $project->link = $request->link;

        $photoName = $request->photo->getClientOriginalName();
        $image =  $request->photo->store('public/img/upload/');
        $request->photo->move(public_path('/img/upload/'),   $photoName);
        $project->photo = $photoName;
        $project->save();


        if (file_exists($image)) {
            @unlink($image);
        } else {
            $photoName = $project->photo;
        }
        $project->save();
    }


    public function get_edit_project($id)
    {
        $project = Project::find($id);
        return response()->json([
            'project' => $project
        ], 200);
    }

    public function update_project(Request $request, $id)
    {
        $project = Project::find($id);

        $project->title = $request->title;
        $project->description = $request->description;
        $project->link = $request->link;

        if ($project->photo != $request->photo) {
            $photoName = $request->photo->getClientOriginalName();
            $image =  $request->photo->store('public/img/upload/');
            $request->photo->move(public_path('/img/upload/'),   $photoName);
            $project->photo = $photoName;
            $project->save();


            if (file_exists($image)) {
                @unlink($image);
            }

            $project->save();
        } else {
            $photoName = $project->photo;
        }
        $project->photo = $photoName;
        $project->save();
    }


    public function delete_project(Request $request, $id)
    {
        $project = Project::findorFail($id);
        $upload_path =   public_path() . "/img/upload/";
        $image = $upload_path . $project->photo;
        if (file_exists($image)) {
            @unlink($image);
        }
        $project->delete();
    }
}
