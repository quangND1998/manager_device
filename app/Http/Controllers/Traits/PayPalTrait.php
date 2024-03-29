<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\order;
use App\BillDetail;
use App\Mail\OrderMail;
use App\Mail\PaymentMail;
use App\payment_history;
// use payment;
use Mail;
use App\license;
use App\Http\Controllers\_Const\Payments\OnePayTest;
use App\Http\Controllers\Traits\UserTrait;
use App\User;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
use Redirect;
use Carbon\Carbon;
use App\cart;
use PayPalConnectionException;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Traits\OnePayTraits;
use App\invoice_userchild;
use App\invoice;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Session;
trait PayPalTrait
{
    // use OnePayTraits;
    private $_api_context;
    public function __construct()
    {
        $this->_api_context = new ApiContext(new OAuthTokenCredential(
            'AWzd9MYTTyM57Rjg8AMVK8suOJXPmHk5rj8OOaM4yiXzf-1UfmXxUwR6JBO6XYdx1cHv3If5V2YG62eS',
            'EAr_KlVb4_H0TN12448KmeY-u9EgTc9y83t7YVAEbrVwqA3fovOPsht7NjqyU-0qYQ4B5eCvq9TBtoa9'
        ));

        // live
        // $this->_api_context = new ApiContext(new OAuthTokenCredential(
        //     'Aabq_l_OnDEGlWhzKtS6RRvRW0LWTVCUq4zZaBnqQ6HqOxciusg9XlxMGVIJV7JrULKXO0TBhhA7_ln0',
        //     'EGCczao0E3_f6uIRmtVMJ_I28Yz8P_DN5ckATN7oDSA9uT4FKcrvtCA4Ok74OgVCFcqsxG6Qpp3QQu0l'
        // ));

        // Set mặc định đơn vị tiền để thanh toán
        $this->paymentCurrency = "USD";

        // Khởi tạo total amount
        $this->totalAmount = 0;

        $setting = array(
            'mode' => env('PAYPAL_MODE', 'sandbox'),
            'http.ConnectionTimeOut' => 30,
            'log.LogEnabled' => true,
            'log.FileName' => storage_path() . '/logs/paypal.log',
            'log.LogLevel' => 'ERROR'
        );

        // $setting = array(
        //     'mode' => env('PAYPAL_MODE', 'live'),
        //     'http.ConnectionTimeOut' => 30,
        //     'log.LogEnabled' => true,
        //     'log.FileName' => storage_path() . '/logs/paypal.log',
        //     'log.LogLevel' => 'ERROR'
        // );
        $this->_api_context->setConfig($setting);
    }
    public function payInvoiceWithpaypal($amount_cart)
    {
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');
        $item_1 = new Item();
        $item_1->setName('package license')
            /** item name **/
            ->setCurrency('USD')
            ->setQuantity(1)
            ->setPrice($amount_cart);
        /** unit price **/

        $item_list = new ItemList();
        $item_list->setItems(array($item_1));
        $amount = new Amount();
        $amount->setCurrency('USD')
            ->setTotal($amount_cart);
        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($item_list)
            ->setDescription('Your transaction description');
        $redirect_urls = new RedirectUrls();
        $redirect_urls->setReturnUrl(URL::to('topup/response_paypal'))
            /** Specify return URL **/
            ->setCancelUrl(URL::to('topup/response_paypal'));
        $payment = new Payment();
        $payment->setIntent('Sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirect_urls)
            ->setTransactions(array($transaction));

        $payment->create($this->_api_context);
        return $payment;

    }
    public function responsePayPal(Request $request){
        $payment_id = Session::get('paypal_payment_id');
        /** clear the session payment ID **/
        Session::forget('paypal_payment_id');
        if (empty($request->PayerID) || empty($request->token)) {
            Session::put('error', 'Payment failed');
            return redirect('/');
        }
        $payment = Payment::get($payment_id, $this->_api_context);
        $execution = new PaymentExecution();
        $execution->setPayerId($request->PayerID);
        $result = $payment->execute($execution, $this->_api_context);

        return $result;
    }
    // public function getPaymentStatus(){
    //     $payment_id = Session::get('paypal_payment_id');
    //     Session::forget('paypal_payment_id');

    //     if(empty(Input::get('PayerID')) || empty(Input::get('token'))){
    //         return redirect()
    //                 ->route('bookstore.shipping')
    //                 ->with('danger', 'Payment failed.');
    //     }

    //     $payment = Payment::get($payment_id, $this->_api_context);
    //     $execution = new PaymentExecution();
    //     $execution->setPayerId(Input::get('PayerID'));

    //     $result = $payment->execute($execution, $this->_api_context);

    //     if($result->getState() == 'approved'){
    //         // Send Email
    //         $email_data = [
    //             'number_of_books' => $payment->transactions[0]->item_list->items[0]->name,
    //             'shipping' => [
    //                 'street' => $payment->payer->payer_info->shipping_address->line1,
    //                 'city' => $payment->payer->payer_info->shipping_address->city,
    //                 'state' => $payment->payer->payer_info->shipping_address->state,
    //                 'country' => $payment->payer->payer_info->shipping_address->country_code,
    //             ]
    //         ];

    //         // Send email function here ...

    //         return redirect()
    //                 ->route('bookstore.shipping')
    //                 ->with('success', 'Transaction payment success!');
    //     }

    //     return redirect()
    //             ->route('bookstore.shipping')
    //             ->with('danger', 'Payment failed.');
    // }

}
