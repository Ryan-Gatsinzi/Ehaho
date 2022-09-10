<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\users_profile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //login
    public function login(Request $request){            
        $formFields = $request->validate([
            'phone'=>'required',
            'pwd'=>'required'
        ]);             
        $formFields['password'] = $formFields['pwd'];        
        unset($formFields['pwd']);                 
        if(auth()->attempt($formFields)){            
            if(auth()->user()->active == 'Yes' && auth()->user()->approved == 'Yes'){                 
                $request->session()->regenerate();                
                $user_info = DB::table('users_profile')->where('user_id', auth()->user()->id)->get()[0];
                return response()->json(['message'=>'Successfully logged in','token'=>session()->token(), 'user_info'=>$user_info]);
                // return redirect('/')->with(response()->json(['message'=>'Successfully logged in']));
            }elseif(auth()->user()->active == 'No' && auth()->user()->approved == 'No'){
                auth()->logout();

                //invalidate session and regenerate csrf token

                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return response()->json(['error'=>'Your account is not approved or active']);
                // return back()->withErrors(['phone'=>'Your account is not approved or active'])->onlyInput('phone');
            }elseif(auth()->user()->approved == 'No' ){
                auth()->logout();

            //invalidate session and regenerate csrf token

                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return response()->json(['error'=>'Your account is not approved']);
                // return back()->withErrors(['phone'=>'Your account is not approved'])->onlyInput('phone');
            }else{        
                auth()->logout();

                //invalidate session and regenerate csrf token

                $request->session()->invalidate();
                $request->session()->regenerateToken(); 
                return response()->json(['error'=>'Your account is not active']);       
                // return back()->withErrors(['phone'=>'Your account is not active'])->onlyInput('phone');
            }
                                    
        }else{                        
            return response()->json(['error'=>'invalid credentials']);
            // return back()->with(response()->json(['error'=>'invalid credentials']));            
            // return back()->withErrors(['phone'=>'invalid credentials'])->onlyInput('phone');
        }           
    }

    //User logout
    public function logout(Request $request){
        auth()->logout();

        //invalidate session and regenerate csrf token

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message'=>'Successfully logged out']);
    }
}
