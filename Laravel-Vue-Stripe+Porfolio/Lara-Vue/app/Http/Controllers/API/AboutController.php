<?php

namespace App\Http\Controllers\API;


use App\Models\About;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;


class AboutController extends Controller
{
    public function edit_about()
    {
        return About::orderBy('id', 'desc')->first();
    }

    public function update_about(Request $request, $id)
    {
        $about = About::find($id);

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
        ]);

        // if ($about->cv != $request->cv) {
        //     $strpos = strpos($request->cv, ';');
        //     $sub = substr($request->cv, 0, $strpos);
        //     $ex = explode('/', $sub)[1];
        //     $namecv = time() . "." . $ex;
        //     $img = Image::make($request->photo)->resize(700, 500);
        //     $upload_path =   public_path() . "/img/upload/";
        //     $image = $upload_path . $about->photo;
        //     $img->save($upload_path . $namecv);

        //     // $img = Image::make($request->cv)->resize(700, 500);
        //     // $upload_path = public_path() . "/img/upload/";
        //     // $image = $upload_path . $about->cv;
        //     // $img->save($upload_path . $namecv);
        //     if (file_exists($image)) {
        //         @unlink($image);
        //     } else {
        //         $namecv = $about->cv;
        //     }
        // }




        $about->name = $request->name;
        $about->email = $request->email;
        $about->phone = $request->phone;
        $about->address = $request->address;
        $about->description = $request->description;
        $about->tagline = $request->tagline;

        // $about->photo = $name;
        // $about->cv = $namecv;

        $about->save();
    }


    public function update_about_file(Request $request, $id)
    {
        $about = About::find($id);

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
        ]);


        $cvName = $request->cv->getClientOriginalName();
        $image =  $request->cv->store('public/img/upload/');
        $request->cv->move(public_path('/img/upload/'),   $cvName);
        $about->cv = $cvName;
        $about->save();


        if (file_exists($image)) {
            @unlink($image);
        } else {
            $cvName = $about->cv;
        }
    }
}
