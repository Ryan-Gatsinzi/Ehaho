<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class users_profile extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [  
        'user_id',
        'first_name',
        'last_name',
        'gender',
        'user_picture',
        'national_id',
        'country',
        'province',
        'district',
        'sector',
        'cell',
        'village',
        'street_number',
        'common_place',
        'address_1',
        'address_2',
        'state',
        'city',
        'zip_code',
        'deleted_at',
    ];

    //Relationship to users
    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
