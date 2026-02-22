# FloraLink - Activity Diagrams

This document contains activity diagrams for key workflows in the FloraLink eCommerce system.

## 1. User Registration Flow

```mermaid
flowchart TD
    Start([User Visits Registration Page]) --> EnterInfo[Enter Name, Email, Password]
    EnterInfo --> ValidateInput{Validate Input}
    ValidateInput -->|Invalid| ShowError1[Show Validation Error]
    ShowError1 --> EnterInfo
    ValidateInput -->|Valid| CheckEmail{Email Already Exists?}
    CheckEmail -->|Yes| ShowError2[Show Email Exists Error]
    ShowError2 --> EnterInfo
    CheckEmail -->|No| HashPassword[Hash Password]
    HashPassword --> CreateUser[Create User Record]
    CreateUser --> CreateSession[Create Session]
    CreateSession --> SetCookie[Set Session Cookie]
    SetCookie --> RedirectHome[Redirect to Home Page]
    RedirectHome --> End([Registration Complete])
```

## 2. User Login Flow

```mermaid
flowchart TD
    Start([User Visits Login Page]) --> EnterCreds[Enter Email and Password]
    EnterCreds --> ValidateInput{Validate Input}
    ValidateInput -->|Invalid| ShowError1[Show Validation Error]
    ShowError1 --> EnterCreds
    ValidateInput -->|Valid| FindUser{Find User by Email}
    FindUser -->|Not Found| ShowError2[Show Invalid Credentials Error]
    ShowError2 --> EnterCreds
    FindUser -->|Found| VerifyPassword{Verify Password Hash}
    VerifyPassword -->|Invalid| ShowError3[Show Invalid Credentials Error]
    ShowError3 --> EnterCreds
    VerifyPassword -->|Valid| CreateSession[Create New Session]
    CreateSession --> SetCookie[Set Session Cookie]
    SetCookie --> LoadCart[Load User's Cart]
    LoadCart --> RedirectDashboard[Redirect to Dashboard/Home]
    RedirectDashboard --> End([Login Complete])
```

## 3. Shopping Flow (Browse → Add to Cart → Checkout)

```mermaid
flowchart TD
    Start([User Visits Website]) --> Browse[Browse Products/Categories]
    Browse --> ViewProduct[View Product Details]
    ViewProduct --> Decision1{Interested in Product?}
    Decision1 -->|No| Browse
    Decision1 -->|Yes| CheckAuth{User Authenticated?}
    CheckAuth -->|No| PromptLogin[Prompt to Login/Register]
    PromptLogin --> Login[User Logs In]
    Login --> AddToCart
    CheckAuth -->|Yes| AddToCart[Add Product to Cart]
    AddToCart --> SelectQuantity[Select Quantity]
    SelectQuantity --> UpdateCart[Update Cart in Storage]
    UpdateCart --> ShowConfirm[Show Confirmation Message]
    ShowConfirm --> Decision2{Continue Shopping?}
    Decision2 -->|Yes| Browse
    Decision2 -->|No| ViewCart[View Shopping Cart]
    ViewCart --> ReviewItems[Review Cart Items]
    ReviewItems --> Decision3{Modify Cart?}
    Decision3 -->|Yes| ModifyCart[Update Quantities/Remove Items]
    ModifyCart --> ViewCart
    Decision3 -->|No| ProceedCheckout[Proceed to Checkout]
    ProceedCheckout --> EnterShipping[Enter Shipping Address]
    EnterShipping --> EnterContact[Enter Contact Information]
    EnterContact --> EnterPayment[Enter Payment Information]
    EnterPayment --> ValidateCheckout{Validate All Information}
    ValidateCheckout -->|Invalid| ShowError[Show Validation Errors]
    ShowError --> EnterShipping
    ValidateCheckout -->|Valid| CalculateTotal[Calculate Order Total]
    CalculateTotal --> CreateOrder[Create Order Record]
    CreateOrder --> ClearCart[Clear Shopping Cart]
    ClearCart --> ShowConfirmation[Show Order Confirmation]
    ShowConfirmation --> End([Order Placed Successfully])
```

## 4. Admin Product Management Flow

```mermaid
flowchart TD
    Start([Admin Accesses Dashboard]) --> CheckAdmin{Verify Admin Role}
    CheckAdmin -->|Not Admin| AccessDenied[Show Access Denied]
    AccessDenied --> End1([End])
    CheckAdmin -->|Is Admin| ViewDashboard[View Admin Dashboard]
    ViewDashboard --> SelectAction{Select Action}
    
    SelectAction -->|Create| CreateFlow[Create New Product]
    CreateFlow --> EnterDetails1[Enter Product Details]
    EnterDetails1 --> UploadImage1[Upload Product Image]
    UploadImage1 --> SelectCategory1[Select Category]
    SelectCategory1 --> SetFeatured1[Set Featured Status]
    SetFeatured1 --> ValidateProduct1{Validate Product Data}
    ValidateProduct1 -->|Invalid| ShowError1[Show Validation Error]
    ShowError1 --> EnterDetails1
    ValidateProduct1 -->|Valid| SaveProduct1[Save Product to Storage]
    SaveProduct1 --> ShowSuccess1[Show Success Message]
    ShowSuccess1 --> ViewDashboard
    
    SelectAction -->|Update| SelectProduct2[Select Product to Edit]
    SelectProduct2 --> LoadProduct2[Load Product Details]
    LoadProduct2 --> EditDetails2[Edit Product Information]
    EditDetails2 --> ValidateProduct2{Validate Changes}
    ValidateProduct2 -->|Invalid| ShowError2[Show Validation Error]
    ShowError2 --> EditDetails2
    ValidateProduct2 -->|Valid| UpdateProduct2[Update Product in Storage]
    UpdateProduct2 --> ShowSuccess2[Show Success Message]
    ShowSuccess2 --> ViewDashboard
    
    SelectAction -->|Delete| SelectProduct3[Select Product to Delete]
    SelectProduct3 --> ConfirmDelete{Confirm Deletion}
    ConfirmDelete -->|Cancel| ViewDashboard
    ConfirmDelete -->|Confirm| DeleteProduct3[Remove Product from Storage]
    DeleteProduct3 --> ShowSuccess3[Show Success Message]
    ShowSuccess3 --> ViewDashboard
    
    SelectAction -->|View Orders| ViewOrders[View All Orders]
    ViewOrders --> ViewDashboard
    
    SelectAction -->|Logout| Logout[Logout Admin]
    Logout --> End2([End])
```

## 5. Session Management Flow

```mermaid
flowchart TD
    Start([User Makes Request]) --> CheckCookie{Session Cookie Exists?}
    CheckCookie -->|No| GuestAccess[Grant Guest Access]
    GuestAccess --> End1([Continue as Guest])
    
    CheckCookie -->|Yes| ExtractSession[Extract Session ID]
    ExtractSession --> FindSession{Find Session in Storage}
    FindSession -->|Not Found| InvalidSession[Clear Invalid Cookie]
    InvalidSession --> GuestAccess
    
    FindSession -->|Found| CheckExpiry{Session Expired?}
    CheckExpiry -->|Yes| DeleteSession[Delete Expired Session]
    DeleteSession --> InvalidSession
    
    CheckExpiry -->|No| LoadUser[Load User Data]
    LoadUser --> SetUserContext[Set User Context]
    SetUserContext --> RenewSession[Extend Session Expiry]
    RenewSession --> End2([Continue as Authenticated User])
```

## 6. Cart Calculation Flow

```mermaid
flowchart TD
    Start([Calculate Cart Total]) --> LoadCart[Load Cart Items]
    LoadCart --> CheckEmpty{Cart Empty?}
    CheckEmpty -->|Yes| ReturnZero[Return Total: $0]
    ReturnZero --> End1([End])
    
    CheckEmpty -->|No| InitTotal[Initialize Total = 0]
    InitTotal --> LoopStart{More Items?}
    LoopStart -->|No| ApplyTax[Apply Tax if Applicable]
    ApplyTax --> ApplyShipping[Calculate Shipping Cost]
    ApplyShipping --> ReturnTotal[Return Final Total]
    ReturnTotal --> End2([End])
    
    LoopStart -->|Yes| GetItem[Get Next Cart Item]
    GetItem --> LoadProduct{Load Product Data}
    LoadProduct -->|Not Found| SkipItem[Skip Invalid Item]
    SkipItem --> LoopStart
    
    LoadProduct -->|Found| CalcItemTotal[Calculate: Price × Quantity]
    CalcItemTotal --> AddToTotal[Add to Running Total]
    AddToTotal --> LoopStart
```

## Workflow Notes

### Key Decision Points
1. **Authentication Checks**: Required before cart operations and checkout
2. **Validation Steps**: Input validation at multiple stages to ensure data integrity
3. **Admin Authorization**: Role-based access control for administrative functions
4. **Session Management**: Automatic session validation and renewal

### Error Handling
- All workflows include validation and error feedback loops
- Users can retry operations after correcting errors
- Invalid sessions automatically redirect to guest access

### Performance Considerations
- Cart calculations performed client-side for responsiveness
- Session validation on each request for security
- Lazy loading of product details to optimize browsing
