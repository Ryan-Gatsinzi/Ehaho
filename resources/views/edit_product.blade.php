@extends('layout')
@section('content')
<section class="h-100 h-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-8 col-xl-6">
          <div class="card rounded-3">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
              class="w-100" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;"
              alt="Sample photo">
            <div class="card-body p-4 p-md-5">
              <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">{{$product->product_name}}</h3>
              
              <form class="px-md-2" action="/update" method="POST">  
                @csrf
                <div class="row">
                  <div class="col-md-6 mb-4"> 
                    <input type="number" name="id" value="{{$product->id}}" hidden/>
                    <div class="form-outline datepicker" style="padding-right: 25px; padding-bottom: 25px;">
                      <label for="exampleDatepicker1" class="form-label">Minimum order quantity</label>
                      <input type="number" class="form-control" name="minimum_order_quantity" id="exampleDatepicker1" value="{{$product->minimum_order_quantity}}"/>   
                      @error('minimum_order_quantity')
                      <p class="text-danger h6">{{$message}}</p>
                      @enderror                     
                    </div>

                    <div class="form-outline datepicker"  style="padding-right: 25px; padding-bottom: 25px;">
                      <label class="form-label">Minimum order indicator</label>
                        <input type="number" name="minimum_order_indicator" class="form-control" value="{{$product->minimum_order_indicator}}"/>
                        @error('minimum_order_indicator')
                        <p class="text-danger h6">{{$message}}</p>
                        @enderror 
                    </div>
  
                  </div>
                  <div class="col-md-6 mb-4">
  
                    <div class="form-outline datepicker"  style="padding-left: 25px; padding-bottom: 25px;">
                        <label for="exampleDatepicker1" class="form-label">Opening stock</label>
                        <input type="number" class="form-control" name="opening_stock" id="exampleDatepicker1" value="{{$product->opening_stock}}"/>
                        @error('minimum_order_indicator')
                          <p class="text-danger h6">{{$message}}</p>
                        @enderror 
                      </div>
  
                      <div class="form-outline datepicker"  style="padding-left: 25px; padding-bottom: 25px;">
                        <label class="form-label">Price</label>
                          <input type="number" name="product_price" class="form-control" placeholder="Rwanda francs" value="{{$product->product_price}}"/>  
                          @error('product_price')
                           <p class="text-danger h6">{{$message}}</p>
                        @enderror                         
                      </div>
                  </div>
                </div>
  
                <div class="mb-4">                                   
                  <label class="form-label">Packaging</label>
                  <select class="form-select" name="default_unit_package" value="{{old('default_unit_package')}}">
                    <option value="0" selected disabled>Unit packaging</option>
                    @foreach($packaging  as $package)                    
                    <option value="{{$package->id}}">{{$package->package_name}}</option>  
                    @endforeach                 
                  </select>
                  @error('default_unit_package')
                    <p class="text-danger h6">{{$message}}</p>
                  @enderror   
                </div>

                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea name="product_description" class="form-control" id="exampleFormControlTextarea1" rows="3" value="{{old('product_description')}}">{{$product->product_description}}</textarea>   
                        @error('product_description')
                          <p class="text-danger h6">{{$message}}</p>
                        @enderror                    
                    </div>
                    <div class="form-group form-check">
                        <label class="form-check-label" for="exampleCheck1">Publish product</label>
                        @if($product->product_published == 'Yes')
                        <input type="checkbox" class="form-check-input" name="check" checked>
                        @else
                        <input type="checkbox" class="form-check-input" name="check">
                        @endif
                     </div>
  
                <button type="submit" id="sumbit" onclick="disableBtn(this.id);" class="btn btn-success btn-lg mb-1">Submit</button>                     
              </form>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
@endsection