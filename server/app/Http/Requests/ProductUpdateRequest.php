<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'sometimes|integer|exists:users,id',
            'name' => 'sometimes|string|between:3,255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|between:0,999999.99', // decimal(6,2)
            'image' => 'sometimes|image'
        ];
    }
}
