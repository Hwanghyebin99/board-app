import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  form=this.fb.group({
    code: ['', Validators.required],
    num: ['', Validators.required],
    cost: ['', Validators.required]
  })

  data: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: BoardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.form.controls['code'].errors)
  }

  onClickAdd() {
    this.data.push(this.form.value);
  } 

  removeData(code:string) {
    let index = this.data.findIndex((ele)=>ele.code==code);
    if(index==-1) {
      throw new Error();
    }
    this.data.splice(index,1);
  }

  submit() {
    if(this.data.length>0) {
      this.service.submit().subscribe(({success})=>{
        if(success) {
          alert('성공하였습니다.');
          this.router.navigate(['/success'])
        } else {
          alert("실패하였습니다.")
        }
      })
    } else {
      alert("실패하였습니다.")
    }
  }
}
