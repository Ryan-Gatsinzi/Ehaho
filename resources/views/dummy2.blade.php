<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ehaho</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    {{-- <link rel="stylesheet" href="{{mix('css/app.css')}}"> --}}
    <script src="js/App.js"></script>
  </head>
  <body class="vh-100">
    <nav class="navbar navbar-expand-lg bg-light" style="box-shadow:-4px -3px 45px 21px rgba(0,0,0,0.35);">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Ehaho</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              @auth
              <li class="nav-item">
                <a class="nav-link" href="/products">Purchase Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/my_products">My Products</a>
              </li>         
              @endauth              
            </ul>
            @auth
            <span class="navbar-text">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                      <a class="nav-link" href="/logout">Logout</a>
                  </li>
              </ul>
          </span>  
          
          @else
          <span class="navbar-text">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
              
            </ul>
        </span>  
                            
            @endauth
            
          </div>
        </div>
      </nav>
      <div id="root">
        @if(session()->has('message'))
        <div id='msg'>
          <div class="alert alert-success" >{{ session()->get('message') }}</div>          
      </div> 
                          
        @endif     
      </div> 
      @auth
      <div class="text-center">
        {{-- {{dd(DB::table('users_profile')->where('user_id', auth()->user()->id)->get('first_name'))}} --}}
        <h1 class='welcome' hidden>{{DB::table('users_profile')->where('user_id', auth()->user()->id)->get('first_name')}}</h1>
        <h1 class="display_name"  style="margin-top: 25px;"></h1>
        <script>
          document.querySelector('.display_name').innerHTML = 'Welcome '+eval(document.querySelector('.welcome').innerHTML)[0].first_name;
        </script>
      </div>                
      @else
      <div class="text-center">        
        <h1>Log in to access this website</h1>      
      </div>         
      @endauth           
      <main>
        @yield('content')    
    </main>    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    <script>
      setTimeout(() => {
        document.querySelector('#msg').innerHTML='';
      }, 3000);      
    </script> 
    <script src="{{ mix('js/app.js') }}" defer></script>
  </body>
</html>