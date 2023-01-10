<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Section;
class Cart extends Model
{
    use HasFactory;
    public $totalQty = 0;
    public $items = null;
    public $totalPrice = 0;
    public function __construct($oldCart){
		if($oldCart){
			$this->items = $oldCart->items;
			$this->totalQty = $oldCart->totalQty;
			$this->totalPrice = $oldCart->totalPrice;
		}
	}
    public function totalPrice(){
		if(Session::has('cart')){
			$oldCart = Session::get('cart');
			$cart_new = new Cart($oldCart);
			foreach($cart_new->items as $item){
				$this->totalPrice += $item->price;
			}
		}
	}
    public function add($id,$item){
		$giohang = ['qty'=>0,'type'=>'package', 'price' => $item->price, 'item' => $item];
		if($this->items){
			if(array_key_exists($id, $this->items)){
				$giohang = $this->items[$id];
			}
		}
		$giohang['qty']++;
		$giohang['price'] = $item->price *  $giohang['qty'];
		$this->items[$id] = $giohang;
		$this->totalQty++;
		$this->totalPrice += $item->price;
	}
    public function cartList()
    {
        $cartItems = Cart::getContent();
        // dd($cartItems);
        return view('cart', compact('cartItems'));
    }
    //xóa 1
    public function reduceByOne($id){
        if($this->items[$id]['type'] == "package"){
            $this->items[$id]['qty']--;
            $this->items[$id]['price'] -= $this->items[$id]['item']['price'];
            $this->totalQty--;
            $this->totalPrice -= $this->items[$id]['item']['price'];
            if($this->items[$id]['qty']<=0){
                unset($this->items[$id]);
            }
        }else{
            $this->items[$id]['qty']--;
            $this->items[$id]['price'] -= $this->items[$id]['price_one'];
            $this->totalQty--;
            $this->totalPrice -= $this->items[$id]['price_one'];
            if($this->items[$id]['qty']<=0){
                unset($this->items[$id]);
            }
        }
    }
    public function increaseByOne($id){
        if($this->items[$id]['type'] == "package"){
            $this->items[$id]['qty']++;
            $this->items[$id]['price'] += $this->items[$id]['item']['price'];
            $this->totalQty++;
            $this->totalPrice += $this->items[$id]['item']['price'];
        }else{
            $this->items[$id]['qty']++;
            $this->items[$id]['price'] += $this->items[$id]['price_one'];
            $this->totalQty++;
            $this->totalPrice += $this->items[$id]['price_one'];
        }

    }
    //xóa nhiều
    public function removeItem($id){
        $this->totalQty -= $this->items[$id]['qty'];
        $this->totalPrice -= $this->items[$id]['price'];
        unset($this->items[$id]);
    }


}
