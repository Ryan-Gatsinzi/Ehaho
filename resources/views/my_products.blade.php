@extends('layout')
@section('content')
@auth    
    @if (count($products) == 0)
        <h1 class='text-danger text-center'>No product available</h1>        
    @else
    <div class="text-center" style='display: flex;justify-content: center;align-items: center;'>
    @foreach ($products as $product)
    <div class="card" style="width: 18rem; margin:auto">
    <img src="" class="card-img-top" alt="">
    <div class="card-body">
      <?php
      $product_name = DB::table('products')->where('id',$product->product_id)->get('product_name')[0]; 
      $packaging = DB::table('units_packages')->where('id',$product->default_unit_package)->get()[0];   
      $unit = DB::table('uom')->where('id',$packaging->unit_id)->get()[0];     
      ?>
      <h3 class="card-title"><strong>{{$product_name->product_name}}</strong></h3>
      <h6 class="card-title">Published: {{$product->product_published}}</h6>
      <h6 class="card-title">Price: {{$product->product_price}}</h6>
      <h6 class="card-title">Packaging: {{$packaging->package_name}} <i>({{$unit->unit_name}})</i></h6>
      <h6 class="card-title">Minimum order indicator: {{$product->minimum_order_indicator}}</h6>
      
      <hr>
      <p class="card-text">{{$product->product_description}}</p>      
      <a href="/edit/{{$product->id}}/" class="btn btn-primary">Edit</a>  
    </div>
  </div>      
  @endforeach
</div>
  @endif

@endauth
@endsection