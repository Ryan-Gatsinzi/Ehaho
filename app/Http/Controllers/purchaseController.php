<?php

namespace App\Http\Controllers;

use App\Models\business_products;
use App\Models\products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\products_categories;
use App\Models\products_gallery;
use App\Models\business_products_gallery;
use App\Models\products_sub_categories;
use App\Models\user_businesses;

class purchaseController extends Controller
{
    //showing the purchase page
    public function index(products_categories $prod_catg, business_products $b_prod){
        $category = DB::table('products_categories')->where('category_name','processed')->get('id');
        
        $sub_category=[];
        foreach($category as $catg){
            $sub_catg = DB::table('products_sub_categories')->where('category_id',$catg->id)->get();
            array_push($sub_category, $sub_catg);
        }
        if(count($category)>0){                        
            $arr = [];   
            $b_prods = business_products::where('created_by',auth()->user()->id)->get('product_id');        
            $b_prod_id =  json_decode(json_encode($b_prods), true);           
            foreach($sub_category[0] as $sub_categ){              
                $b_prods = DB::table('business_products')->where('created_by',auth()->user()->id)->get('product_id');                                                           
                $product = products::where('sub_category_id',$sub_categ->id)->where('published','Yes')->whereNotIn('id',$b_prod_id)->get();                 
                array_push($arr,$product);               
                // dd($product[0]->id);                                                                                   
            }                        
            return response()->json(['products'=>$arr]);              
            // return view('products',[
            // 'products'=>$arr[0],
            // ]);
        }      
        return response()->json(['products'=>[]]);  
        // return view('products',[
        //     'products'=>[]           
        // ]);
    }

    public function purchase_form($prod_id){
        $product = DB::table('products')->where('id',$prod_id)->get()[0];
        $packaging = DB::table('units_packages')->where('unit_id',$product->unit_id)->get(); 
        $gallery = DB::table('products_gallery')->where('product_id',$product->id)->where('image_type','Featured')->get();    
        $package_arr = [];  
        foreach($packaging as $package){
            array_push($package_arr, $package);
        }        
        return response()->json(['product'=>$product , 'packaging'=>$package_arr, 'image'=>$gallery]);
    }

    public function purchase(Request $request, business_products $business_products, business_products_gallery $bussines_products_gallery){
        $formFields = $request->all();       
        $user_business = user_businesses::where('created_by',auth()->user()->id)->get();
        $gallery = DB::table('products_gallery')->where('product_id', $formFields['product_id'])->get();        
        $formFields['business_id'] = $user_business[0]->id;
        $product['product_published'] = 'Yes';
        $formFields['created_by'] = auth()->user()->id;            
        DB::table('products_stock')->insert(['business_product_id'=>$business_products->create($formFields)->id, 'stock_quantity'=>$request->opening_stock, 'created_by'=>auth()->user()->id]);
        foreach($gallery as $img){            
            DB::table('business_products_gallery')->insert(['business_product_id'=>business_products::where('product_id', $formFields['product_id'])->get()[0]->id,'image_name'=>$img->image_name, 'image_type'=>$img->image_type,'owner_type'=>'Ehaho', 'created_by'=>auth()->user()->id]);

        }              

        return response()->json(['message'=>'Product purchased successfully']);
    }    

    public function gallery($id){
        $gallery = DB::table('products_gallery')->where('product_id', $id)->where('image_type', 'Gallery')->get();
        return response()->json(['images'=>$gallery]);
    }
}