<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Infinity Arena</title>

</head>
<div class="checkout-order-body main-content gradient-lg position-relative">
<!-- overlay -->
      <!-- content area -->
      <div class="content-section">
        <div class="container">
          <header class="header text-center mb-6">
            <div class="row gutters-y">
              <div class="col-12 pt-8">
                <div class="timeline-horizontal">
                  <div class="timeline-item flex-1 p-0" data-step="&#xe60d;">
                    <div class="pt-8 pb-7 px-2 px-sm-4 border-left border-bottom border-secondary">
                      <span class="text-uppercase small-3 fw-600">Your Cart</span>
                    </div>
                  </div>
                  <div class="timeline-item flex-1 p-0" data-step="&#xe69b;">
                    <div class="pt-8 pb-7 px-2 px-sm-4 border-bottom border-secondary">
                      <span class="text-uppercase small-3 fw-600">Account</span>
                    </div>
                  </div>
                  <div class="timeline-item flex-1 p-0" data-step="&#xe721;">
                    <div class="pt-8 pb-7 px-2 px-sm-4 border-bottom border-secondary border-right">
                      <span class="text-uppercase small-3 fw-600">Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div class="position-relative">
          <div class="row">
                    <!-- /.col-lg-12 -->
                    <div class="col-lg-7" style="padding-bottom:120px">
                        <div class="card card-primary">
                            @if(count($errors) > 0)
                                <div class="alert alert-danger">
                                    @foreach($errors->all() as $err)
                                        <strong>{{ $err }}</strong><br/>
                                    @endforeach
                                </div>
                            @endif

                            @if(session('message'))
                                <div class="alert alert-success">
                                    <strong>{{ session('message') }}</strong>
                                </div>
                            @endif
                            <form action="payment/create" method="POST" enctype="multipart/form-data">
                                {{ csrf_field() }}
                                <div class="card-body">
                                    <div class="profile-customer">
                                        <div class="form-group">
                                            <!-- <p><label>URL cổng thanh toán - Virtual Payment Client</label></p> -->
                                            <input class="form-control input-width" type="hidden" name="virtualPaymentClientURL" size="63" value="https://mtf.onepay.vn/paygate/vpcpay.op" maxlength="250" />
                                        </div>
                                        <div class="form-group">
                                            <!-- <p><label>Merchant ID</label></p> -->
                                            <input class="form-control input-width" type="hidden" name="vpc_Merchant" value="TESTONEPAY" size="20" maxlength="16" />
                                        </div>
                                        <div class="form-group">
                                            <!-- <p><label>Merchant AccessCode</label></p> -->
                                            <input class="form-control input-width" type="hidden" name="vpc_AccessCode" value="6BEB2546" size="20" maxlength="8" />
                                        </div>
                                    </div>
                                    <input class="btn btn-block btn-warning" type="submit" value="Pay Now!" />
                                </div>
                            <form>
                        </div>
                    </div>
                </div>
            </div>
</div>
</html>
