<?php

namespace App\Http\Controllers;

use App\Models\orders;
use App\Models\products;
use App\Models\purchases;
use Illuminate\Http\Request;
use App\Models\user_businesses;
use App\Models\business_products;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProductsController extends Controller
{
    //showing the page with all of the user's purchased products
    public function index(){       
        $id = DB::table('user_businesses')->where('created_by',auth()->user()->id)->where('active','Yes')->get();          
        if(count($id)){      
            $products = business_products::where('business_id',$id[0]->id)->get();           
            if(count($products)>0){    
                $products_arr=[];
                foreach($products as $product){                                 
                    $product_name = DB::table('products')->where('id',$product->product_id)->get();  
                    $packaging = DB::table('units_packages')->where('id',$product->default_unit_package)->get();
                    $unit = DB::table('uom')->where('id',$packaging[0]->unit_id)->get();
                    $image = DB::table('business_products_gallery')->where('business_product_id', $product->id)->where('image_type', 'Featured')->get();
                    
                    array_push($products_arr, ['product_name'=>$product_name[0]->product_name, 'product'=>$product, 'packaging'=>$packaging[0]->package_name, 'unit'=>$unit[0]->unit_name, 'image'=>$image]);
                }                         
                return response()->json(['products'=>$products_arr]);             
                // return view('my_products',[
                // 'products'=>$products[0]
                // ]);
            }
        }     
        return response()->json(['products'=>[]]);       
        // return view('my_products',[
        //     'products'=>[]           
        // ]);        
    }

    //showing the page to edit purchased product
    public function edit_form($prod_id){
        $product = business_products::where('id',$prod_id)->get()->first();
        $packaging = DB::table('units_packages')->where('id',$product->default_unit_package)->get();
        $product_name = products::where('id',$product->product_id)->get('product_name')[0];  
        $image = DB::table('business_products_gallery')->where('business_product_id',$prod_id)->where('image_type','Featured')->get();
        $unit = $packaging->first()->unit_id;
        $package_arr = [];  
        foreach(DB::table('units_packages')->where('unit_id',$unit)->get() as $package){        
            array_push($package_arr, $package);
        }        
        return response()->json(['product'=>$product , 'packaging'=>$package_arr, 'product_name'=>$product_name->product_name, 'image'=>$image]);
    }

    //editing the product
    public function update_product(Request $request){          
        $business_products = business_products::find($request->id);       
        $formFields = $request->all();
        unset($formFields['image']); 
        unset($formFields['check']);    
        $user_business = user_businesses::where('created_by',auth()->user()->id)->get()[0];        
        $formFields['business_id'] = $user_business->id;
        if($request->image != 'undefined'){                
            $request->image->storeAs('uploads',$request->image->getClientOriginalName(),'public');
            $image = DB::table('business_products_gallery')->where('business_product_id', $request->id)->where('image_type','Featured');
            if($image->get()->count() > 0){
                $image->update(['image_name'=>$request->image->getClientOriginalName(), 'owner_type'=>'Business']);            
            }else{
                DB::table('business_products_gallery')->insert(['business_product_id'=>$request->id,'image_name'=>$request->image->getClientOriginalName(), 'image_type'=>'Featured', 'owner_type'=>'Business','created_by'=>auth()->user()->id]);
            }
        }
        $isChecked = $request->check != null;        
        if($isChecked == true){                  
            $formFields['product_published'] = 'Yes';
        }else{
            $formFields['product_published'] = 'No';
        }               
        $formFields['created_by'] = auth()->user()->id;                   
        $business_products->update($formFields);
        

        return response()->json(['message'=>'Product updated successfully']);
    }    

    public function check(Request $request){     
        $product = business_products::where('product_id', $request->id)->where('id',auth()->user()->id)->get()[0];
        if(count($product) > 0 ){
            return response()->json(['isPurchased'=>true]);
        }else{
            return response()->json(['isPurchased'=>false]);
        }
    }

    public function my_businesses(){
        $businesses = user_businesses::where('created_by',auth()->user()->id)->where('page_published','Yes')->where('active','Yes')->get();       
        if(count($businesses)>0){
            return response()->json(['businesses'=>$businesses]);
        }else{
            return response()->json([]);
        }    
    } 
    
    public function business_gallery($id){
        $gallery = DB::table('business_products_gallery')->where('business_product_id', $id)->where('image_type', 'Gallery')->get();        
        return response()->json(['images'=>$gallery]);
    }

    public function add_more(Request $request, purchases $purchases){
        $formFields = $request['product_info'];
        unset($formFields['products']);
        $formFields['business_id'] = DB::table('user_businesses')->where('created_by', auth()->user()->id)->get()->first()->id;
        $formFields['payment_status'] = 'successful';
        $formFields['payment_method'] = $request['product_info']['payment_method'];
        $formFields['purchase_channel'] = $request->purchase_channel;
        $formFields['purchase_platform'] = $request->purchase_platform;
        $formFields['purchase_paid_amount'] = $request->purchase_paid_amount;
        $formFields['created_by'] = auth()->user()->id; 
        $purchase_id = $purchases->create($formFields)->id;
        foreach($request['product_info']['products'] as $prod){
            $formFields2 = $prod;        
            $formFields2['purchase_id'] = $purchase_id;        
            $formFields2['created_by'] = auth()->user()->id;
            DB::table('purchases_products')->insert($formFields2);
            $formFields3 = array();
            $formFields3['business_product_id'] = $prod['business_product_id'];    
            $product_stock = DB::table('products_stock')->where('business_product_id',$prod['business_product_id']);
            $formFields3['stock_quantity'] = $prod['purchase_quantity'];
            $formFields3['created_by'] = auth()->user()->id;    
            $new_stock = $product_stock->get()->first()->stock_quantity + $prod['purchase_quantity'];    
            $product_stock->update(['stock_quantity'=>$new_stock]);
        };
        return response()->json(['messgae'=>'succesfully added_more']); 
    }

    public function add_more_form($prod_id){        
        $business_product = DB::table('business_products')->where('id',$prod_id)->get();
        $product_name = DB::table('products')->where('id',$business_product->first()->product_id)->get()->first()->product_name;
        $unit_id = DB::table('products')->where('id',$business_product[0]->product_id)->get()->first()->unit_id;        
        $packaging = DB::table('units_packages')->where('unit_id',$unit_id)->get();
        $stock = DB::table('products_stock')->where('business_product_id',$prod_id)->where('created_by',auth()->user()->id)->get()->first()->stock_quantity;

        return response()->json(['packaging'=>$packaging, 'products'=>$business_product, 'product_name'=>$product_name, 'stock'=>$stock]);
    }

    public function get_b_prod(){        
        $product = [];  
        $business_products = DB::table('business_products')->where('created_by',auth()->user()->id)->where('product_published','Yes')->get();
        foreach($business_products as $b_product){       
        $product_name = DB::table('products')->where('id',$b_product->product_id)->get()->first()->product_name;       
        array_push($product, ['id'=>$b_product->id, 'product_name'=>$product_name]);
        }        
        return response()->json(['products'=>$product]);
    }

    public function sell(Request $request, orders $orders){    
        $formFields = $request['product_info'];
        unset($formFields['products']);
        $formFields['payment_status'] = 'successful';
        $formFields['payment_method'] = $request['product_info']['payment_method'];
        $formFields['sale_channel'] = $request->order_channel;
        $formFields['sale_platform'] = $request->order_platform;
        $formFields['order_paid_amount'] = $request->order_paid_amount;
        $formFields['order_invoice'] = md5(uniqid(rand(), true));
        $formFields['order_status'] = 'successful';
        $formFields['created_by'] = auth()->user()->id; 
        $order_id = $orders->create($formFields)->id;
        foreach($request['product_info']['products'] as $prod){
            $formFields2 = $prod;        
            $formFields2['order_id'] = $order_id;        
            $formFields2['payment_status'] = 'successful';
            $formFields2['order_status'] = 'successful';
            $formFields2['created_by'] = auth()->user()->id;
            DB::table('products_orders')->insert($formFields2);
            $formFields3 = array();
            $formFields3['business_product_id'] = $prod['business_product_id'];    
            $product_stock = DB::table('products_stock')->where('business_product_id',$prod['business_product_id']);
            $formFields3['stock_quantity'] = $prod['order_quantity'];
            $formFields3['created_by'] = auth()->user()->id;    
            $new_stock = $product_stock->get()->first()->stock_quantity - $prod['order_quantity'];    
            $product_stock->update(['stock_quantity'=>$new_stock]);
        };
        return response()->json(['messgae'=>'succesfully added_more']);
    }
}