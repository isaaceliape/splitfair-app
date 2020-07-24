//
//  ContentView.swift
//  splitfair
//
//  Created by Isaac Eliape on 2/15/20.
//  Copyright © 2020 Isaac Eliape. All rights reserved.
//

import SwiftUI

struct NavigationBarModifier: ViewModifier {
  var backgroundColor: UIColor?
  
  init( backgroundColor: UIColor?) {
    self.backgroundColor = backgroundColor
    let coloredAppearance = UINavigationBarAppearance()
    coloredAppearance.configureWithTransparentBackground()
    coloredAppearance.backgroundColor = .clear
    coloredAppearance.titleTextAttributes = [.foregroundColor: UIColor.white]
    coloredAppearance.largeTitleTextAttributes = [.foregroundColor: UIColor.white]
    
    UINavigationBar.appearance().standardAppearance = coloredAppearance
    UINavigationBar.appearance().compactAppearance = coloredAppearance
    UINavigationBar.appearance().scrollEdgeAppearance = coloredAppearance
    UINavigationBar.appearance().tintColor = .white
  }
  
  func body(content: Content) -> some View {
    ZStack{
      content
      VStack {
        GeometryReader { geometry in
          Spacer()
          Color(self.backgroundColor ?? .clear)
            .frame(height: geometry.safeAreaInsets.top)
            .edgesIgnoringSafeArea(.top)
        }
      }
    }
  }
}

extension Color {
  init(hex: Int, alpha: Double = 1) {
    let components = (
      R: Double((hex >> 16) & 0xff) / 255,
      G: Double((hex >> 08) & 0xff) / 255,
      B: Double((hex >> 00) & 0xff) / 255
    )
    self.init(
      .sRGB,
      red: components.R,
      green: components.G,
      blue: components.B,
      opacity: alpha
    )

    let navBarAppearance = UINavigationBar.appearance()
    navBarAppearance.largeTitleTextAttributes = [.foregroundColor: UIColor.white]
    navBarAppearance.titleTextAttributes = [.foregroundColor: UIColor.white]
  }
}

extension UIScreen{
   static let rowHeight = (UIScreen.main.bounds.size.height - 210) / 8
   static let screenHeight = UIScreen.main.bounds.size.height
   static let screenSize = UIScreen.main.bounds.size
}

extension View {
  func navigationBarColor(_ backgroundColor: UIColor?) -> some View {
    self.modifier(NavigationBarModifier(backgroundColor: backgroundColor))
  }
}

let gray_01 = Color(hex: 0xD9E4EA)
let gray_02 = Color(hex: 0xBDBDBD)
let dark_gray_01 = Color(hex: 0x0D0B0D)
let orange_01 = Color(hex: 0xFA4F23)
let window = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
let statusBarHeight = window?.windowScene?.statusBarManager?.statusBarFrame.height ?? 0


struct ContentView: View {
  var body: some View {
    VStack(alignment: .leading, spacing: 3) {
      header()
      firstPersonRow()
      secondPersonRow()
      expensesRow()
      splitButtonRow()
      numberpadFirstRow()
      numberpadSecondRow()
      numberpadThirdRow()
      numberpadFourthRow()
      Spacer()
    }
    .padding(.horizontal, 3.0)
    .background(Color.black)
    .navigationBarColor(.black)
  }
}

struct header: View {
  var body: some View {
    // FirstRow
    HStack(spacing: 3) {
      RoundedRectangle(cornerRadius: 9, style: .continuous)
        .fill(gray_01)
        .frame(height: 120)

      Image("logo")
        .padding(-5.0)
        .frame(width: 260.0, height: 120)
        .background(gray_01)
        .cornerRadius(10)
        .overlay(RoundedRectangle(cornerRadius: 9)
          .stroke(lineWidth: 0))
      
      RoundedRectangle(cornerRadius: 9, style: .continuous)
        .fill(Color(hex: 0xD9E4EA))
        .frame(height: 120)
    }
    .padding(.top, 40)
  }
}

struct firstPersonRow: View {
  @State private var person1 = "Person 1"
  
  var body: some View {
    HStack(spacing: 3) {
      ZStack {
        TextField("Person 1", text: $person1)
          .frame(width: 133, height: UIScreen.rowHeight)
          .font(.system(size: 24))
          .foregroundColor(gray_02)
          .multilineTextAlignment(.center)
      }
      .frame(width: 173, height: UIScreen.rowHeight)
      .background(gray_01)
      .cornerRadius(9)
      
      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("$0")
          .font(.system(size: 24))
          .foregroundColor(gray_02)
          .multilineTextAlignment(.trailing)
          .frame(width: 170.0)
      }
      .cornerRadius(9)
    }
  }
}

struct secondPersonRow: View {
  @State private var person2 = "Person 2"

  var body: some View {
    HStack(spacing: 3) {
      ZStack {
        TextField("Person 2", text: $person2)
        .frame(width: 133, height: 52)
        .font(.system(size: 24))
        .foregroundColor(gray_02)
        .multilineTextAlignment(.center)
      }
      .frame(width: 173, height: UIScreen.rowHeight)
      .background(gray_01)
      .cornerRadius(9)
      
      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
          .font(.system(size: 24))

        Text("$0")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0xBDBDBD))
      }
      .frame(height: UIScreen.rowHeight)
      .background(Color(hex: 0xFA4F23))
      .cornerRadius(9)
    }
  }
}

struct expensesRow: View {
  var body: some View {
    HStack(spacing: 3) {
      ZStack {
        Text("Expenses")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(width: 173, height: UIScreen.rowHeight)
      .background(orange_01)
      .cornerRadius(9)
      
      ZStack{
        Color(hex: 0x000000)
          .frame(height: UIScreen.rowHeight)
        Text("$0")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0xBDBDBD))
          .opacity(0.3)
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)
    }
  }
}

struct splitButtonRow: View {
  var body: some View {
    HStack(spacing: 3) {
      ZStack{
        Color(hex: 0x0B98DD)
          .frame(height: UIScreen.rowHeight)
        Text("Split")
          .font(.system(size: 24))
          .foregroundColor(gray_01)
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)
    }
  }
}

struct numberpadFirstRow: View {
  var body: some View {
    HStack(spacing: 3) {
      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("7")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)

      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("8")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)

      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("9")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)
    }
  }
}

struct numberpadSecondRow: View {
  var body: some View {
    HStack(spacing: 3) {
      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("4")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)

      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("5")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)

      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("6")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)
    }
  }
}

struct numberpadThirdRow: View {
  var body: some View {
    HStack(spacing: 3) {
      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("1")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)

      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("2")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)

      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("3")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)
    }
  }
}

struct numberpadFourthRow: View {
  var body: some View {
    HStack(spacing: 3) {
      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("<")
          .font(.system(size: 24))
          .foregroundColor(orange_01)
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)

      ZStack{
        gray_01
          .frame(height: UIScreen.rowHeight)
        Text("0")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)

      ZStack{
        orange_01
          .frame(height: UIScreen.rowHeight)
        Text("Enter")
          .font(.system(size: 24))
          .foregroundColor(Color(hex: 0x0D0B0D))
      }
      .frame(height: UIScreen.rowHeight)
      .cornerRadius(9)
    }
    .padding(.bottom, 30)
  }
}

struct ContentView_Previews: PreviewProvider {
   static var previews: some View {
      Group {
         ContentView()
            .previewDevice(PreviewDevice(rawValue: "iPhone 8"))
            .previewDisplayName("iPhone 8")

         ContentView()
            .previewDevice(PreviewDevice(rawValue: "iPhone 11 Pro Max"))
            .previewDisplayName("iPhone 11 Pro Max")
      }
   }
}
