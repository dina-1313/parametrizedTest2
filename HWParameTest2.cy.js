describe('ParamTestForToasts', () => {
    beforeEach(() => {
      cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/');
      cy.get('[src="assets/images/material-dark-theme.jpg"]').click();
      cy.get('[title="Modal & Overlays"]').click();
      cy.get('[title="Toastr"]').click();
    })
  
    const checkToasts = [
      {
        testData: {
          position: {
            name: 'top-right position',
            locator: '#nb-option-24',
          },
          title: 'title2',
          content: 'content2',
          time: '1000',
          type: {
            name: 'success type',
            locator: '#nb-option-33',
          }
        },
        expectedResult: {
          icon: 'checkmark',
          title: 'title2',
          content: 'content2',
          color: 'rgb(96, 175, 32)',
          position: 'justify-content: flex-end; align-items: flex-start;'
        },
      },
      {
        testData: {
          position: {
            name: 'top-left position',
            locator: '#nb-option-25',
          },
          title: 'title3',
          content: 'content3',
          time: '1000',
          type: {
            name: 'info type',
            locator: '#nb-option-34',
          }
        },
        expectedResult: {
          icon: 'question-mark',
          title: 'title3',
          content: 'content3',
          color: 'rgb(4, 149, 238)',
          position: 'justify-content: flex-start; align-items: flex-start;'
        },
      },
      {
        testData: {
          position: {
            name: 'bottom-left position',
            locator: '#nb-option-26',
          },
          title: 'title4',
          content: 'content4',
          time: '1000',
          type: {
            name: 'warning type',
            locator: '#nb-option-35',
          }
        },
        expectedResult: {
          icon: 'alert-triangle',
          title: 'title4',
          content: 'content4',
          color: 'rgb(255, 159, 5)',
          position: 'justify-content: flex-start; align-items: flex-end;'
        },
      },
      {
        testData: {
          position: {
            name: 'bottom-right position',
            locator: '#nb-option-27',
          },
          title: 'title5',
          content: 'content5',
          time: '1000',
          type: {
            name: 'danger type',
            locator: '#nb-option-36',
          }
        },
        expectedResult: {
          icon: 'flash',
          title: 'title5',
          content: 'content5',
          color: 'rgb(176, 0, 32)',
          position: 'justify-content: flex-end; align-items: flex-end;'
        },
      }
    ]
    checkToasts.forEach(checkToast => {
      it(`Check toast: ${checkToast.testData.position.name} and ${checkToast.testData.type.name}`, () => {
        
        cy.get('[name="title"]').clear().type(checkToast.testData.title);
        cy.get('[name="content"]').clear().type(checkToast.testData.content);
        cy.get('[name="timeout"]').clear().type(checkToast.testData.time);
        cy.get('[class="col-md-6 col-sm-12"]:first-of-type nb-select').click();
        cy.get(checkToast.testData.position.locator).click();
        cy.get('[class="col-md-6 col-sm-12"]:last-of-type nb-select').click();
        cy.get(checkToast.testData.type.locator).click();
        cy.get('nb-card-footer button:first-of-type').click();
  
        cy.get('[ng-reflect-toast="[object Object]"]').then(toast => {
          expect(toast).to.contain(checkToast.expectedResult.title);
          expect(toast).to.contain(checkToast.expectedResult.content);
          expect(toast).to.have.css('background-color', checkToast.expectedResult.color);
          
          cy.get('[ng-reflect-config="[object Object]"] [data-name="Layer 2"]>[data-name]').then(icon => {
            expect(icon.attr('data-name')).to.equal(checkToast.expectedResult.icon);
          });
          cy.get('[class="toastr-overlay-container cdk-global-overlay-wrapper"]').then(toastPosition => {
            expect(toastPosition.attr('style')).to.equal(checkToast.expectedResult.position);
          })
        })
      })
    })
  })
  