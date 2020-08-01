<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function __construct()
    {
        // $this->middleware(['auth:api']);
    }

    /**
     * Get image URL from storage
     * @param path where image is stored
     */
    public function getImage(Request $request) 
    {
        $request->validate([
            'path' => 'required|string'
        ]);

        return Storage::url($request->path);
    }
}
