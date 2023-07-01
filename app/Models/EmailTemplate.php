<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
    use HasFactory;
    use HasUuids;

    protected $primaryKey = 'template_id';

    protected $fillable = ['content', 'template_name', 'templated_id'];
}
