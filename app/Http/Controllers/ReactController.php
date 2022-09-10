<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReactController extends Controller
{
    //For routing to react page
    public function show(){
        return view('./main');
    }
}
