<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class business_sectors extends Model
{
    use HasFactory,SoftDeletes;
    //Relationship to users
    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
