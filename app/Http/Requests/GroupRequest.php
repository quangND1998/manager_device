<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Response;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\App;
class GroupRequest extends FormRequest
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

        if (Session::has('locale')) {

            $locale = Session::get('locale', Config::get('app.locale'));
          
        } else {
            $locale = substr(request()->server('HTTP_ACCEPT_LANGUAGE'), 0, 2);

            if ($locale != 'vi' && $locale != 'en') {
                $locale = 'en';
            }
        }
        // dd($locale);
        // App::setLocale($locale);

        return [
            'name' => 'required',
            'devices' => 'required'
        ];
    }

    public function failedValidation(Validator $validator)

    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }


    
}
