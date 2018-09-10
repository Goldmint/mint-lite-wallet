import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SendData} from "../../../models/send-data";
import {Subscription} from "rxjs/index";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../services/common.service";
import {ApiService} from "../../../services/api.service";
import {AccountBalance} from "../../../models/account-balance";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-send-tokens',
  templateUrl: './send-tokens.component.html',
  styleUrls: ['./send-tokens.component.scss']
})
export class SendTokensComponent implements OnInit, OnDestroy {

  public page = ['send', 'confirm', 'success'];
  public currentPage = this.page[0];

  public sendData = new SendData;
  public loading: boolean = false;
  public invalidBalance: boolean = true;
  public isAddressMatch: boolean = false;
  public balance = new AccountBalance();
  public txId = 'pa43WLY7Tz6uJZmKo7gerPLuCHHejKzFs1otRwx6fLsSgp1KRThKmCzsuWUP'; // TODO for test
  public detailsLink: string = environment.detailsTxInfoLink;

  private sub1: Subscription;
  private sub2: Subscription;
  private chrome = window['chrome'];

  constructor(
    private apiService: ApiService,
    private ref: ChangeDetectorRef,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params.subscribe(params => {
      this.sendData.token = params.id ? params.id : 'gold';
      this.ref.detectChanges();
    });

    this.sub2 = this.commonService.chooseAccount$.subscribe(() => {
      this.getCurrentWallet();
    });

    this.getCurrentWallet();
  }

  getCurrentWallet() {
    this.loading = true;
    this.chrome.storage.local.get(null, (result) => {
      const wallet = result.wallets[result.currentWallet]
      this.sendData.from = wallet.publicKey;

      this.apiService.getWalletBalance(wallet.publicKey).subscribe(data => {
        this.balance.gold = data['data'].goldAmount;
        this.balance.mnt = data['data'].mintAmount;

        this.checkAddressMatch();
        this.loading = false;
        this.ref.detectChanges();
      });
      this.ref.detectChanges();
    });
  }

  checkAmount() {
    if (this.sendData.amount === 0 || this.sendData.amount > this.balance[this.sendData.token]) {
      this.invalidBalance = true;
    } else {
      this.invalidBalance = false;
    }
    this.ref.detectChanges();
  }

  checkAddressMatch() {
    this.isAddressMatch = this.sendData.from === this.sendData.to;
    this.ref.detectChanges();
  }

  copyText(val: string){
    this.commonService.copyText(val);
  }

  ngOnDestroy() {
    this.sub1 && this.sub1.unsubscribe();
    this.sub2 && this.sub2.unsubscribe();
  }
}
