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
      <h5 class="card-title">{{$product->product_name}}</h5>
      <hr>
      <p class="card-text">{{$product->default_description}}</p>
      <?php
      $prod = DB::table('business_products')->where('product_id',$product->id);
      ?>
      @if ($prod->count() > 0)
      <a href="" class="btn btn-secondary" disabled>Already purchased</a>
      @else
      <a href="/purchase/{{$product->id}}/" class="btn btn-primary">Purchase</a>
      @endif      
    </div>
  </div>      
  @endforeach
</div>
  @endif

@endauth
@endsection