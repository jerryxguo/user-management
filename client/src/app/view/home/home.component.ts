import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { ConfirmationDialogService } from '../../service/confirmation-dialog.service';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, private confirmationDialogService: ConfirmationDialogService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            if (currentUser.id == id){
                this.confirmationDialogService.confirm('Warning', 'you are login with user - ' + currentUser.username + '.\n It can not be deleted!' )
                .then((confirmed) => {
                    console.log('User confirmed:', confirmed);
                })
                .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
           }
           else{
                this.confirmationDialogService.confirm('Confirmation', 'Do you really want to delete '+ id + '?')
                .then((confirmed) => {
                    console.log('User confirmed:', confirmed);
                    if(confirmed){
                        this.userService.delete(id).pipe(first()).subscribe(() => {
                            this.loadAllUsers()
                        });
                    }
                })
                .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
           }
        }

    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(response  => {
            if(response['body']!=null){
                this.users = response['body'];
            }
        });
    }
}