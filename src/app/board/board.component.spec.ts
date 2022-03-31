import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoardComponent } from './board.component';
import { BoardService } from '../board.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let service;
  let router: Router;

      let data0 = {
      code: 'gk221',
      num: 4,
      cost: 5000
    }
    let data1 = {
      code: 'gk223',
      num: 1,
      cost: 6000
    }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      imports: [    
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule, HttpClientTestingModule,
      
        RouterTestingModule.withRoutes([]),
      ],
      providers:[
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(BoardService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('빈 form value를 가지고 있어야 한다.', () => {
    Object.keys(component.form.value).forEach((ele)=>{
      expect(component.form.value[ele]).toEqual("");
    })
  })

  describe('추가 버튼을 눌렀을 때', ()=>{

    it('모든 입력이 빈 값이 아니어야 한다.', ()=>{
      Object.keys(component.form.value).forEach((ele)=>{
        expect(component.form.controls[ele].hasError('required')).toBeTruthy();
      })
    })

    it('입력이 데이터에 추가되어야 한다.', ()=>{
      component.form.patchValue({
        code: 'gk221',
        num: 4,
        cost: 5000
      })

      const button = fixture.debugElement.nativeElement.querySelector('.add-button');
      button.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(component.data.length).toEqual(1);
      expect(component.data).toContain(component.form.value)
    })
  })

  describe('테이블', ()=>{

    beforeEach(()=>{
      component.form.patchValue(data0)
      component.onClickAdd();
      component.form.patchValue(data1)
      component.onClickAdd();
    })


    it('데이터가 표시되어야 한다', ()=>{
      fixture.detectChanges();
      const td = fixture.debugElement.nativeElement.querySelectorAll('table tbody tr');
      expect(td.length).toEqual(2);
    })

    describe('삭제 버튼을 눌렀을 때', ()=>{

      it('해당 데이터가 삭제되어야 한다.',()=>{
        component.removeData(data0.code);
        expect(component.data.length).toBe(1);
        expect(component.data).not.toContain(data0)
      }
      )
    })
  })

it('완료 버튼을 눌러 성공시 성공 페이지로 넘어가야 한다', () => {
  component.data = [data0, data1]
  component.submit();
  const req = httpTestingController.expectOne('http://localhost:8000/stocks/fds');
  req.flush({success:true});

  expect(router.navigate).toHaveBeenCalledWith(['/success']);

})

it('완료 버튼을 눌러 실패시 alert 를 띄워야 한다.', () => {
  component.data = [];
  spyOn(window, "alert");
  component.submit();
  
  expect(window.alert).toHaveBeenCalledWith("실패하였습니다.");

  component.data = [data0, data1]
  component.submit();
  const req = httpTestingController.expectOne('http://localhost:8000/stocks/fds');
  req.flush({success:false});
  
  expect(window.alert).toHaveBeenCalledWith("실패하였습니다.");
})
});
