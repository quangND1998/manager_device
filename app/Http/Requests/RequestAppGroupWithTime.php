<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
class RequestAppGroupWithTime extends FormRequest
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
            'link_app'=> 'required',
            'time' => 'required|numeric|gt:0'
        ];
    }
    public function failedValidation(Validator $validator)

    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
