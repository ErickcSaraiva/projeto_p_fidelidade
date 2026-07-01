import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'screens/home.dart';
import 'screens/games.dart';
import 'screens/balance.dart';
import 'screens/profile.dart';
import 'providers/user_provider.dart';

void main() {
  runApp(MultiProvider(
    providers: [ChangeNotifierProvider(create: (_) => UserProvider())],
    child: MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Teddy's House",
      theme: ThemeData.dark().copyWith(
        primaryColor: Color(0xFF8AC6FF),
        scaffoldBackgroundColor: Color(0xFF0F1113),
      ),
      home: MainShell(),
    );
  }
}

class MainShell extends StatefulWidget {
  @override
  _MainShellState createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _selectedIndex = 0;
  final _pages = [HomeScreen(), GamesScreen(), BalanceScreen(), ProfileScreen()];

  void _onTap(int idx) {
    setState(() {
      _selectedIndex = idx;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedSwitcher(
        duration: Duration(milliseconds: 350),
        switchInCurve: Curves.easeOutCubic,
        switchOutCurve: Curves.easeInCubic,
        child: _pages[_selectedIndex],
        layoutBuilder: (currentChild, previousChildren) {
          return Stack(children: [...previousChildren, if (currentChild != null) currentChild]);
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onTap,
        selectedItemColor: Color(0xFF8AC6FF),
        unselectedItemColor: Colors.grey[400],
        backgroundColor: Color(0xFF0B0C0D),
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.videogame_asset), label: 'Games'),
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet), label: 'Balance'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}
