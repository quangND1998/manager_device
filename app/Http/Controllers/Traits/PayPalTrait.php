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
use Session;
use Carbon\Carbon;
use App\cart;
use PayPalConnectionException;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Traits\OnePayTraits;
use App\invoice_userchild;
use App\invoice;
use Illuminate\Support\Facades\URL;
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
        $redirect_urls->setReturnUrl(URL::to('status_invoicee'))
            /** Specify return URL **/
            ->setCancelUrl(URL::to('status_invoicee'));
        $payment = new Payment();
        $payment->setIntent('Sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirect_urls)
            ->setTransactions(array($transaction));
        return $payment;
    }

}
